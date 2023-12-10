import os
import subprocess
import time

# Launch local server
os.chdir(os.path.dirname(os.path.realpath(__file__)))
subprocess.Popen("python3 -m http.server", shell=True)

# Open index.html in Firefox (replace 'path_to_firefox.exe' with the actual path)
firefox_path = r'"C:\\Program Files\\Mozilla Firefox\\firefox.exe"'  # Example path, replace with actual path
os.system(f'"{firefox_path}" http://localhost:8000/index.html')