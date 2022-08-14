const router = require('express').Router();
const { Category, Product } = require('../../models');

function errorHandler500(res){

  return err => {

    res.status(500).json({
      error: 'Error encountered. Please try again soon.'
    })
  }
}
// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      { model: Product }
    ]
  }).then((categories) => {
    res.json(categories);
  })
  .catch(errorHandler500(res));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id, {
    include: [
      { model: Product }
    ]
  }).then(category => res.json(category))
  .catch(errorHandler500(res))
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,    
  }).then(category => {
    res.json(category)
  })
  .catch(errorHandler500(res));
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updated = await Category.update({
      category_name: req.body.category_name,
    }, {
      where: {
        id: req.params.id,
      }, 
    })
    res.json(updated)
  }catch(err){
    errorHandler500(res)(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deleted = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.json(deleted)
  }catch(err){
    errorHandler500(res)(err);
  }
});

module.exports = router;
