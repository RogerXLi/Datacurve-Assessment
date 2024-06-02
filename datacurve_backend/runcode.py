import os
import docker

client = docker.from_env()

def runCode(code):
    # write to temp file
    file_path = '../code.py'
    with open(file_path, 'w') as file:
        file.write(code)

    logs = {"output": "", "stdout": "", "stderr": ""}

    try:
        container = client.containers.run(
            image="python_env",
            command="sh -c \"python /app/code.py\"",
            volumes={
                os.path.abspath(file_path): {'bind': '/app/code.py', 'mode': 'ro'}
            },
            detach=True
        )

        container.wait()

        output = container.logs().decode("utf-8")
        stdout = container.logs(stderr=False).decode("utf-8")
        stderr = container.logs(stdout=False).decode("utf-8")

        logs = {"output": output, "stdout": stdout, "stderr": stderr}
    finally:
        container.remove()
        os.remove(file_path)

    return logs
