const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      { model: Product, through: ProductTag }
    ]
  }).then((tags) => {
    res.json(tags);
  })
  .catch(errorHandler500(res));
  
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {
    include: [
      { model: Product, through: ProductTag }
    ]
  }).then(category => res.json(category))
  .catch(errorHandler500(res))
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(
   req.body
  ).then(category => {
    res.json(category)
  })
  .catch(errorHandler500(res));
});
// update a tag's name by its `id` value

router.put('/:id', (req, res) => {
  Tag.update(
    req.body, 
    {
      where: {
        id: req.params.id,
      }
    }
  ).then(category => {
    res.json(category)
  })
  .catch(errorHandler500(res));
  
});

router.delete('/:id', (req, res) => {
  Tag.destroy(
   
    {
      where: {
        id: req.params.id,
      }
    }
  ).then(category => {
    res.json(category)
  })
  .catch(errorHandler500(res));
  
  // delete on tag by its `id` value
});

module.exports = router;
