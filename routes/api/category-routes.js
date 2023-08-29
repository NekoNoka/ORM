const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  let categoryData = await Category.findAll({
    include: [{ model: Product }]
  });
  const categories = categoryData.map((category) => category.get({ plain: true }));
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  // be sure to include its associated Products
  let category = await Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  });

  if (!category) {
    res.status(404).json({ message: 'No category found with that id!' });
    return;
  }

  res.json(category);
});

router.post('/', (req, res) => {
  Category.create(req.body).then((newCategory) => {
    res.json(newCategory);
  }).catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: { id: req.params.id }
  }).then((updatedCategory) => {
    res.json(updatedCategory);
  }).catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: { id: req.params.id }
  }).then((deletedCategory) => {
    res.json(deletedCategory);
  }).catch((err) => res.json(err));
});

module.exports = router;
