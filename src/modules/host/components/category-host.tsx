import { CategoryInput } from './inputs/category-input'
import { slideUpContainer } from '@/main/animations'
import { categoriesMocks } from '@/modules/filters'
import { motion } from 'framer-motion'

import React from 'react'
import { Heading } from '@/modules/core'

type Props = {
  setClick: (id: number) => void
  selectedCategory: number
}

export const CategoryHost = ({ selectedCategory, setClick }: Props) => {
  return (
    <>
      <Heading title="Qual das seguintes opções descreve melhor seu espaço?" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideUpContainer}
        className="mt-4 grid grid-cols-2 w-full md:grid-cols-3 gap-4"
      >
        {categoriesMocks.map(item => (
          <CategoryInput
            item={item}
            setCategoryId={setClick}
            categoryId={selectedCategory}
            key={item.label}
          />
        ))}
      </motion.div>
    </>
  )
}
