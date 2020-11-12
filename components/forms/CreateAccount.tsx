import Joi from 'joi'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import {
  Input,
  Button,
  VStack,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/core'

type RegisterInputType = {
  name: string
  password: string
  checkPassword: string
}

const schema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(8).required(),
  checkPassword: Joi.ref('password'),
})

export const CreateAccountForm: FC = () => {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, errors, control } = useForm({
    resolver: joiResolver(schema),
  })

  const onSubmit = ({ name, password }: RegisterInputType) => {
    setSubmitted(true)
    fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        router.push('/login')
      })
      .catch(e => {
        console.log(e)
      })
      .finally(() => {
        setSubmitted(false)
      })
  }

  return (
    <VStack
      as="form"
      p="1rem"
      w="100%"
      maxWidth={{ base: '375px', md: '450px' }}
      pos="relative"
      spacing="1.2rem"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl>
        <FormLabel htmlFor="name">Username</FormLabel>
        <Controller
          as={<Input type="text" size="sm" name="name" disabled />}
          control={control}
          name="name"
          defaultValue="admin"
        />
      </FormControl>

      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input ref={register} type="password" size="sm" name="password" />
        <FormHelperText>At least 8 words</FormHelperText>
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={errors.checkPassword}>
        <FormLabel htmlFor="checkPassword">Confirm Password</FormLabel>
        <Input
          ref={register}
          type="password"
          size="sm"
          name="checkPassword"
        />
        {errors.checkPassword && (
          <FormErrorMessage>Passwords do not match</FormErrorMessage>
        )}
      </FormControl>

      <Button
        type="submit"
        w="100%"
        size="sm"
        colorScheme="green"
        isLoading={submitted}
      >
        Setup
      </Button>
    </VStack>
  )
}
