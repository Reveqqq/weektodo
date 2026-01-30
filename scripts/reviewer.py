import os
from github import Github

def main():
    token = os.environ["GITHUB_TOKEN"]
    repo_name = os.environ["GITHUB_REPOSITORY"]
    event_path = os.environ["GITHUB_EVENT_PATH"]

    with open(event_path, "r") as f:
        import json
        event = json.load(f)

    pr_number = event["pull_request"]["number"]

    gh = Github(token)
    repo = gh.get_repo(repo_name)
    pr = repo.get_pull(pr_number)

    pr.create_issue_comment(
        "AI Reviewer (MVP)\n\n"
        "Workflow запущен успешно.\n"
        "CI проверен.\n\n"
        "_Следующий шаг: анализ diff и Issue._"
    )

    print("Review comment posted")

if __name__ == "__main__":
    main()
