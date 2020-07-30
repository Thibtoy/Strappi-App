# Simplon's Quizz

:point_right: You can see the last Figma Wireframe [here](https://www.figma.com/file/HjvZ8ZlbjnD50xRK7QlXKo/quizz?node-id=0%3A1).

:mag_right: **Application description**

> Simplon's Quizz aims asking several questions, based on different tech's themes.
> An user must be authenticate to start a quizz.
> Each question of a quizz may be answered differently.
> First way, user text input, if it's a good answer, the user earn 4 points.
> Second way, the user can choose one answer between four proposals, if it's a good answer, the user earn 2 points.
> Third way, the user can choose one answer between two proposals, if it's a good answer, the user earn 1 points.
> Each user response is saved in database in order to retrieve statistics later.

## PREREQUISITES

> Git.
> MySql on port:3306.
> npm.

## QUICK-INSTALL

### :zap: INSTALL

1. Clone this repository.

2. In Application/config, copy database.dist.json to database.json, fill with the correct values.

3. If it's the first time that you're running this project, go to the *Application* folder, at the root of the repository, with your terminal and run the following command:
        ```npm install```

### :cyclone: LAUNCH

1. To start backend: Go to the *Application* folder, at the root of the repository, with a separate terminal and run the following command:
        ```npm run dev-back```

    You can now access to your Api at 'http://localhost:8000'

2. To start frontend: Go to the *Application* folder, at the root of the repository, with a separate terminal and run the following command:
        ```npm run dev-front```

    You can now access to your front at 'http://localhost:1234'

*No needs to create the database on your mysql server, if it does not exists, it'll be created while runing the app*

## FOLLOW OUR WORK

If you have access to it (ask us an access by sending us your email) you can see our work in progress on our [Trello](https://trello.com/b/k87B2FK9/quizz).

---

## :scroll: ENTITIES

| USERS      | QUESTIONS   | ANSWERS     | GAMES       | USER_ANSWERS  |
| ---------- | ----------- | ----------- | ----------- | ------------- |
| ID         | ID          | ID          | ID          | ID            |
| USERNAME   | TITLE       | TITLE       | USER_ID     | ANSWER(TEXT)  |
| EMAIL      |             | IS_VALID    | SCORE       | GAME_ID       |
| PASWWORD   |             | QUESTION_ID | DURATION    | QUESTION_ID   |
|            |             |             | RATIO       | ANSWER_ID     |

---

## :star2: TEAM

:email: kula.jega@gmail.com

:email: aluq93@gmail.com

:email: helen_moiseeva@yahoo.com

:email: cabanes.thibault@gmail.com
