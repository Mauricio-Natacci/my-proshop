import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import Product from '../models/productModel'

// @desc  Fetch all products
// @route GET /api/products
// @acess Public
const getProducts = asyncHandler(async (req: any, res: Response) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc  Fetch single product
// @route GET /api/products/:id
// @acess Public
const getProductById = asyncHandler(async (req: any, res: Response) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc  Delete a product
// @route DELETE /api/products/:id
// @acess Public/Admin
const deleteProduct = asyncHandler(async (req: any, res: Response) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'product removed!' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req: any, res: Response) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req: any, res: Response) => {
  const { name, price, description, image } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
