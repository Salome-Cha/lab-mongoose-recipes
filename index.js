const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  // CREATE A NEW RECIPE BY CHAINING THE CREATE function:
  .then(() => {
    return Recipe.create(
      {
            title: 'Caesar Salad',
            level:'Easy Peasy',
            ingredients: ['salad', 'tomatoes', 'chicken', 'toasts', 'sauce'],
            cuisine: 'French',
            dishType: 'main_course',
            image: 'https://images.media-allrecipes.com/images/75131.jpg',
            duration: 20,
            creator: 'Chef Mélissa',
            created:  2020-11-05
      }
    )
  })  
  .then((recipe) => {
    console.log (`A new ${recipe.title} recipe was added`);
  })
  .then (() => {
    return Recipe.insertMany(data)})
  .then(() => { 
    console.log("The array of data coming from JSON file was inserted in the database")  // Insertion Success
  })
  .then(()=>{
     return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, { $set:  {duration: 100}})  
  })
  .then (() => {
    console.log('The recipe was update')   // update Success
  })
  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then(() =>{
  console.log('The carrot cake was deleted')    // deletion Success
  })
  .catch(error => {
     console.error('Error during the process', error);
  })
 .finally(()=> {
    mongoose.connection.close()    // connection closing.
  })

