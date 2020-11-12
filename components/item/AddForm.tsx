import Joi from 'joi'
import { FC, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import {
  Input,
  Button,
  VStack,
  FormLabel,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  useToast,
} from '@chakra-ui/core'

import { ItemFormType } from 'interfaces'
import { AuthContext } from 'contexts/auth'

const schema = Joi.object({
  name: Joi.string().max(100).required(),
  description: [Joi.string().max(150).optional(), Joi.allow(null)],
  content: Joi.string().required(),
})

export const AddItemForm: FC = () => {
  const toast = useToast()
  const { auth } = useContext(AuthContext)
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, reset, errors } = useForm({
    resolver: joiResolver(schema),
  })

  const onSubmit = ({ name, description, content }: ItemFormType) => {
    setSubmitted(true)
    fetch('/api/item/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: auth.user?.id,
        name,
        description,
        content,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        toast({
          title: `Store secret ${data.ok ? 'success' : 'failed'}`,
          description: data.msg,
          position: 'bottom-right',
          duration: 2000,
          status: data.ok ? 'success' : 'error',
          isClosable: true,
        })
      })
      .catch(e => {
        console.log(e)
      })
      .finally(() => {
        reset()
        setSubmitted(false)
      })
  }

  return (
    <VStack
      as="form"
      p="1rem"
      w="100%"
      pos="relative"
      spacing="1.2rem"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isRequired isInvalid={errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input ref={register} type="text" size="sm" name="name" />
        <FormHelperText>Maximum 100 texts</FormHelperText>
        {errors.name && (
          <FormErrorMessage>{errors.name.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={errors.description}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input ref={register} type="text" size="sm" name="description" />
        <FormHelperText>Maximum 150 texts</FormHelperText>
        {errors.description && (
          <FormErrorMessage>{errors.description.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={errors.content}>
        <FormLabel htmlFor="content">Content</FormLabel>
        <Textarea
          ref={register}
          name="content"
          resize="none"
          placeholder="Insert password, secret key, note... etc."
        />
        {errors.content && (
          <FormErrorMessage>{errors.content.message}</FormErrorMessage>
        )}
      </FormControl>

      <Button
        type="submit"
        w="100%"
        size="sm"
        colorScheme="green"
        disabled={!auth.user}
        isLoading={submitted}
      >
        Save item
      </Button>
    </VStack>
  )
}
