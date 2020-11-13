import Joi from 'joi'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { FC, useState, useContext } from 'react'
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

import { AuthContext } from 'contexts/auth'

type UpdateInputType = {
  password: string
  checkPassword: string
}

const schema = Joi.object({
  password: Joi.string().min(8).required(),
  checkPassword: Joi.ref('password'),
})

export const UpdateAccountForm: FC = () => {
  const router = useRouter()
  const { setAuth } = useContext(AuthContext)
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  })

  const onSubmit = ({ password }: UpdateInputType) => {
    setSubmitted(true)
    fetch('/api/user/update-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        fetch('/api/auth/logout').then(res => {
          if (res.status === 200) {
            setAuth({
              status: false,
              user: undefined,
            })
            router.push('/login')
          }
        })
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
      pos="relative"
      spacing="1.2rem"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        variant="outline"
        colorScheme="red"
        isLoading={submitted}
      >
        Update and logout
      </Button>
      <Button w="100%" onClick={() => router.push('/settings')}>
        Cancel
      </Button>
    </VStack>
  )
}
