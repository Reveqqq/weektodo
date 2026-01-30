#!/usr/bin/env python3
"""
AI Reviewer Agent - запускается в GitHub Actions в форке проекта
Анализирует PR и выносит решение
"""
import os
import json
from github import Github

# Если есть OPENAI API key, используем OpenAI GPT для анализа
try:
    from code_agent.llm import generate_review_comment
    HAS_LLM = True
except:
    HAS_LLM = False

def get_pr_info():
    """Получает информацию о PR из GitHub Actions события"""
    token = os.environ.get("GITHUB_TOKEN")
    repo_name = os.environ.get("GITHUB_REPOSITORY")
    event_path = os.environ.get("GITHUB_EVENT_PATH")

    if not event_path or not os.path.exists(event_path):
        raise ValueError("GITHUB_EVENT_PATH не установлен или не существует")

    with open(event_path, "r") as f:
        event = json.load(f)

    pr_number = event["pull_request"]["number"]
    gh = Github(token)
    repo = gh.get_repo(repo_name)
    pr = repo.get_pull(pr_number)

    return repo, pr, event

def get_issue_body(repo, pr):
    """Получает тело Issue, которое закрывает этот PR"""
    # Ищем Closes #123 в описании PR
    import re
    match = re.search(r'Closes\s+#(\d+)', pr.body or "")
    if match:
        issue_num = int(match.group(1))
        try:
            issue = repo.get_issue(issue_num)
            return issue.body
        except:
            pass
    return pr.body or "No issue found"

def get_pr_diff(pr):
    """Получает diff всех файлов в PR"""
    diff_parts = []
    for file in pr.get_files():
        diff_parts.append(f"\n### {file.filename}")
        diff_parts.append(f"Status: {file.status}")
        if file.patch:
            diff_parts.append(f"```diff\n{file.patch}\n```")
        else:
            diff_parts.append("(binary or no changes)")
    return "\n".join(diff_parts)

def check_ci_status(repo, pr):
    """Проверяет статус CI/CD"""
    status = "unknown"
    for status_check in pr.get_commits()[-1].get_statuses():
        if status_check.context == "continuous-integration":
            status = status_check.state  # success, failure, pending
            break
    return status

def generate_review(repo, pr):
    """Генерирует review комментарий"""
    
    if HAS_LLM:
        # Анализируем с помощью LLM
        issue_body = get_issue_body(repo, pr)
        diff = get_pr_diff(pr)
        
        try:
            result = generate_review_comment(diff, issue_body)
            summary = result.get("summary", "")
            issues = result.get("issues", [])
            decision = result.get("decision", "COMMENT")
        except Exception as e:
            summary = f"Error analyzing with LLM: {e}"
            issues = []
            decision = "COMMENT"
    else:
        # Базовый анализ без LLM
        summary = "PR successfully analyzed by AI Reviewer"
        issues = []
        decision = "COMMENT"

    # Формируем комментарий
    comment_lines = [
        "## 🤖 AI Reviewer Report",
        "",
        f"**Summary:** {summary}",
        ""
    ]

    if issues:
        comment_lines.append("### Issues Found:")
        for issue in issues:
            comment_lines.append(f"- {issue}")
        comment_lines.append("")

    # Добавляем информацию о CI
    try:
        ci_status = check_ci_status(repo, pr)
        comment_lines.append(f"### CI Status: `{ci_status.upper()}`")
    except:
        pass

    comment_lines.extend([
        "",
        f"### Decision: `{decision}`",
        "_Review performed by AI Code Reviewer_"
    ])

    return "\n".join(comment_lines), decision

def main():
    try:
        repo, pr, event = get_pr_info()
        pr_number = pr.number
        
        print(f"[Reviewer] Анализирую PR #{pr_number}: {pr.title}")
        
        # Генерируем review
        comment_body, decision = generate_review(repo, pr)
        
        # Постим комментарий
        pr.create_issue_comment(comment_body)
        print(f"[Reviewer] Комментарий опубликован")
        
        # Пытаемся создать официальный review
        event_map = {
            "APPROVE": "APPROVE",
            "REQUEST_CHANGES": "REQUEST_CHANGES",
            "COMMENT": "COMMENT"
        }
        
        try:
            pr.create_review(
                body=comment_body,
                event=event_map.get(decision, "COMMENT")
            )
            print(f"[Reviewer] Review создан с решением: {decision}")
        except Exception as e:
            print(f"[Reviewer] Review не создан (fallback на комментарий): {e}")

    except Exception as e:
        print(f"[Reviewer] ERROR: {e}")
        import traceback
        traceback.print_exc()
        exit(1)

if __name__ == "__main__":
    main()
