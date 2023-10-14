const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Connexion à la base de données
mongoose.connect('mongodb://localhost:27017/nom_de_votre_base_de_données', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// Gérer les erreurs de connexion
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connexion réussie à la base de données');
});

// Définition du schéma de personne
const personSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  âge: Number,
  favoriteFoods: [String],
});

// Création du modèle de personne
const Person = mongoose.model('Person', personSchema);
const nouvellePersonne = new Person({
    nom: 'John',
    âge: 30,
    favoriteFoods: ['Pizza', 'Burger'],
  });
// Ajout d'une personne
  nouvellePersonne.save()
  .then((données) => {
    console.log('Personne enregistrée avec succès :', données);
  })
  .catch((erreur) => {
    console.error(erreur);
  });
  const arrayOfPeople = [
    { nom: 'Alice', âge: 25, favoriteFoods: ['Sushi'] },
    { nom: 'Bob', âge: 35, favoriteFoods: ['Pasta'] },
  ];
  // creer de nouveaux
  Person.create(arrayOfPeople)
    .then((données) => {
      console.log('Personnes créées avec succès :', données);
    })
    .catch((erreur) => {
      console.error(erreur);
    });
// model.find
Person.find({ nom: 'Alice' })
  .then((personnes) => {
    console.log('Personnes trouvées :', personnes);
  })
  .catch((erreur) => {
    console.error(erreur);
  });
// findOne
Person.findOne({ favoriteFoods: 'Sushi' })
  .then((personne) => {
    if (personne) {
      console.log('Personne trouvée :', personne);
    } else {
      console.log("Aucune personne avec l'aliment préféré 'Sushi' trouvé.");
    }
  })
  .catch((erreur) => {
    console.error(erreur);
  });
// id
const personId = new ObjectId("652acf9057495f01924418e6");

Person.findById(personId)
  .then((personne) => {
    if (personne) {
      console.log('Personne trouvée par ID :', personne);
    } else {
      console.log('Aucune personne trouvée pour cet ID.');
    }
  })
  .catch((erreur) => {
    console.error(erreur);
  });
// trouver et mise à jour
  Person.findOneAndUpdate({ nom: 'Alice' }, { âge: 26 }, { new: true })
  .then((personne) => {
    if (personne) {
      console.log('Personne mise à jour :', personne);
    } else {
      console.log('Aucune personne trouvée pour la mise à jour.');
    }
  })
  .catch((erreur) => {
    console.error(erreur);
  });
// trouver id puis supprimer
const person = new ObjectId("652acf9057495f01924418e6");
  Person.findByIdAndRemove(person)
    .then((personneSupprimée) => {
      if (personneSupprimée) {
        console.log('Personne supprimée :', personneSupprimée);
      } else {
        console.log('Aucune personne trouvée pour la suppression.');
      }
    })
    .catch((erreur) => {
      console.error(erreur);
    });
// supprimer avec model
Person.deleteMany({ nom: 'Mary' })
  .then((résultat) => {
    console.log('Personnes supprimées :', résultat);
  })
  .catch((erreur) => {
    console.error(erreur);
  });
// requête
Person.find({ favoriteFoods: 'Burritos' })
  .sort('nom')
  .limit(2)
  .select('-âge')
  .exec()
  .then((données) => {
    console.log('Personnes qui aiment les burritos :', données);
  })
  .catch((erreur) => {
    console.error(erreur);
  });