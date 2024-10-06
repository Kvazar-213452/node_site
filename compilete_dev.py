import os

let = input("Type ")

if int(let) == 0:
    os.system("git add -A")
    name = input("Name: ")
    os.system(f'git commit -m "{name}"')
    os.system("git push")
elif int(let) == 1:
    os.system("sass prefab/main.scss static/css/main.css")
    os.system("sass prefab/w.scss static/css/w.css")
    os.system("sass prefab/b.scss static/css/b.css")