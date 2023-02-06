import asyncHandler from 'express-async-handler'
import { type Request, type Response } from 'express'
import Product from '../models/productModel'
import { NotFoundError } from '../errors/NotFoundError'

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({})
  res.json(products)
})

const findProductById = async (id: string) => {
  const product = await Product.findById(id)
  if (product == null) {
    throw new NotFoundError('Product not found')
  }
  return product
}

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await findProductById(req.params.id)
    res.json(product)
  }
)

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await findProductById(req.params.id)
    await product.remove()
    res.json({ message: 'product removed!' })
  }
)

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  }
)

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await findProductById(req.params.id)

    product.name = req.body.name
    product.price = req.body.price
    product.description = req.body.description
    product.image = req.body.image

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  }
)
