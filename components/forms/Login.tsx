import Joi from 'joi'
import { useRouter } from 'next/router'
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
  useToast,
} from '@chakra-ui/core'

import { UserInputType } from 'interfaces'
import { AuthContext } from 'contexts/auth'

const schema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(8).required(),
})

export const LoginForm: FC = () => {
  const toast = useToast()
  const router = useRouter()
  const { setAuth } = useContext(AuthContext)
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, reset, errors } = useForm({
    resolver: joiResolver(schema),
  })

  const onSubmit = ({ name, password }: UserInputType) => {
    setSubmitted(true)
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          fetch('/api/auth/verify')
            .then(res => {
              if (res.status === 200) {
                return res.json()
              }
            })
            .then(info => {
              setAuth({
                status: true,
                user: {
                  id: info.data.id,
                  name: info.data.name,
                },
              })
              router.push('/dashboard')
            })
        } else {
          toast({
            title: 'Login failed',
            description: 'Invaild username or password',
            position: 'bottom',
            duration: 2000,
            status: 'error',
            isClosable: true,
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
      .finally(() => {
        reset({ name: 'admin' })
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
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Username</FormLabel>
        <Input ref={register} type="text" size="sm" name="name" />
        {errors.name && (
          <FormErrorMessage>{errors.name.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input ref={register} type="password" size="sm" name="password" />
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>

      <Button
        type="submit"
        w="100%"
        size="sm"
        colorScheme="green"
        isLoading={submitted}
      >
        Login
      </Button>
    </VStack>
  )
}
