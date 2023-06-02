const express = require('express');
const router = express.Router();
require('dotenv').config()
const taskRepository = require("../repositories/task-repository");

router.post('/seeder-task', async (req, res) => {
    const task =
        {
            id_level: 1,
            name_level: 'Beginner task',
        };

    try {
        await taskRepository.createTask(task);
        res.status(200).send('Seeded task successfully!');
    } catch (err) {
        console.log(err);
        res.status(500).send('Failed to seed task.');
    }
});


router.post('/post', async (req, res) => {
    try {
        const tasks = [
            { id_level: 1, name_task: "Faire cours de yoga matinal" },
            { id_level: 1, name_task: "Faire du jogging dans le parc" },
            { id_level: 1, name_task: "Prendre les escaliers a la place des ascenseurs" },
            { id_level: 1, name_task: "Marcher a la place de prendre le bus" },
            { id_level: 1, name_task: "Jouer à un sport d'équipe ou faire fitness maison" },
            { id_level: 1, name_task: "Organiser une compétition amicale" },
            { id_level: 1, name_task: "Essayer une nouvelle activité" },
            { id_level: 2, name_task: "Assister à une représentation théâtrale" },
            { id_level: 2, name_task: "Visiter un musée ou une galerie d'art" },
            { id_level: 2, name_task: "Lire un livre d'un auteur étranger" },
            { id_level: 2, name_task: "Écouter de la musique du monde entier" },
            { id_level: 2, name_task: "Regarder de film internationale" },
            { id_level: 2, name_task: "Cuisine un plat traditionnel" },
            { id_level: 2, name_task: "Participer à une visite guidée de votre ville" },
            { id_level: 3, name_task: "Explorer une nouvelle langue" },
            { id_level: 3, name_task: "Faire des recherches sur un sujet scientifique" },
            { id_level: 3, name_task: "Commencer créer un projet personnel" },
            { id_level: 3, name_task: "Écrire une biographie sur une figure historique" },
            { id_level: 3, name_task: "Écouter des podcasts sur l'histoire" },
            { id_level: 3, name_task: "Découvrir une nouvelle activité" },
            { id_level: 3, name_task: "Apprendre 10 nouvelles phrases en anglais" },
            { id_level: 4, name_task: "Consacrer du temps à votre hobby principal" },
            { id_level: 4, name_task: "Explorez différents styles de danse" },
            { id_level: 4, name_task: "Explorez les sentiers naturels de votre région" },
            { id_level: 4, name_task: "Initiez-vous aux bases du yoga et meditation" },
            { id_level: 4, name_task: "Essayez de nouvelles recettes" },
            { id_level: 4, name_task: "Explorez le monde de la photographie" },
            { id_level: 4, name_task: "Essayez différentes techniques de dessin" },
            { id_level: 5, name_task: "Planifier des repas équilibrés" },
            { id_level: 5, name_task: "Faire une liste de courses saine" },
            { id_level: 5, name_task: "Organiser un défi culinaire" },
            { id_level: 5, name_task: "Faire une journée de repas végétariens" },
            { id_level: 5, name_task: "Faire une journée de repas sans sucre ajouté" },
            { id_level: 5, name_task: "Organiser une journee detox" },
            { id_level: 5, name_task: "Préparer des repas en avance" },
            { id_level: 6, name_task: "Faire une journée de digital detox" },
            { id_level: 6, name_task: "Prendre un bain relaxant aux huiles essentielles" },
            { id_level: 6, name_task: "Appeler ou rencontrer un ami proche" },
            { id_level: 6, name_task: "Essayer une nouvelle activité créative" },
            { id_level: 6, name_task: "Planifier une sortie ou une activité" },
            { id_level: 6, name_task: "Organiser votre espace de travail " },
            { id_level: 6, name_task: "Faire du bénévolat dans une organisation" },
            { id_level: 7, name_task: "Organiser un dîner ou une soirée" },
            { id_level: 7, name_task: "Organiser une soirée jeux de société à la maison" },
            { id_level: 7, name_task: "Organiser un pique-nique dans un parc" },
            { id_level: 7, name_task: "Organiser un brunch le week-end" },
            { id_level: 7, name_task: "Participer à des événements locaux" },
            { id_level: 7, name_task: "Inviter des collègues de travail à un déjeuner" },
            { id_level: 7, name_task: "Inviter des voisins à un apéro convivial" },
            { id_level: 8, name_task: "Nettoyer les vitres et les fenêtres" },
            { id_level: 8, name_task: "Laver les sols dans toutes les pièces" },
            { id_level: 8, name_task: "Passer l'aspirateur dans toutes les pièces" },
            { id_level: 8, name_task: "Nettoyer les plafonniers et les luminaires" },
            { id_level: 8, name_task: "Désencombrer et organiser les armoires" },
            { id_level: 8, name_task: "Laver les coussins et les housses de coussin" },
            { id_level: 8, name_task: "Nettoyer les appareils électroménagers" },
        ];

        await Promise.all(tasks.map(task => taskRepository.createTask(task)));
        res.status(200).end('Post successful');
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal error');
    }
});


router.get('/:id_task', async (req, res) => {
    try {
        const idTask = await taskRepository.getNumberTask(req.params.id_task);
        if (!idTask) {
            res.status(500).send('task not found');
            return;
        }
        res.send(idTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

router.delete('/deleteTasks', async (req, res) => {
    try {
         await taskRepository.deleteAllTasks();
        res.status(200).send('ok');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});


exports.initializeRoutes = () => router;