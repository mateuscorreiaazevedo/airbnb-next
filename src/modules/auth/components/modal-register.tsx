'use client'

// Components
import { ButtonPrimary, InputField, Modal } from '@/main/ui'
import { OauthOptions } from './oauth-options'
// Icons
import { X } from 'lucide-react'
// Utils
import { useRegisterModal } from '../hooks/use-register-modal'
import { FormProvider, useForm } from 'react-hook-form'
import { useUserMenu } from '../../user/hooks/use-user-menu'
import { setNotification } from '@/modules/core'
// Service
import { authService } from '../service/auth-service'
// React
import React from 'react'
import { useLoginModal } from '../hooks/use-login-modal'

export default function ModalRegister() {
  const [loading, setLoading] = React.useState(false)
  const { setOpen: closePopover } = useUserMenu()
  const { setOpen: setLogin } = useLoginModal()
  const { open, setOpen } = useRegisterModal()
  const methods = useForm<UserRegister>()

  const closeModal = () => {
    methods.reset()
    closePopover(false)
    setOpen()
  }

  const navigateToLoginModal = () => {
    setLogin()
    setOpen()
  }

  async function handleRegisterUser({
    email,
    name,
    password,
    confirmPassword
  }: UserRegister) {
    setLoading(true)
    try {
      const response = await authService.register({
        confirmPassword,
        email,
        name,
        password
      })
      setNotification(response, 'success')
      navigateToLoginModal()
    } catch (error) {
      setNotification((error as any).message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <Modal isOpen={open} toggleOpenChange={setOpen}>
        <div className="fixed w-modal min-h-modal shadow-md border border-zinc-300 top-1/2 right-1/2 translate-x-1/2 bg-white rounded-lg animate-modal -translate-y-1/2">
          <section className="flex w-full items-center px-4 h-16 border-b border-zinc-300">
            <button
              onClick={closeModal}
              className="p-2 rounded-full hover:bg-neutral-100 active:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="flex-1 text-center font-bold text-lg">Cadastrar-se</h2>
          </section>
          <section className="p-8 space-y-4">
            <h1 className="text-2xl font-semibold">Bem-vindo ao Airbnb</h1>
            <form
              onSubmit={methods.handleSubmit(handleRegisterUser)}
              className="w-full flex flex-col items-center justify-center gap-4"
            >
              <fieldset>
                <InputField label="Email" field="email" roundedTop />
                <InputField label="Nome" field="name" />
                <InputField label="Senha" field="password" hasPassword />
                <InputField
                  label="Confirmar senha"
                  field="confirmPassword"
                  roundedBotton
                  hasPassword
                />
              </fieldset>
              <p className="text-zinc-400 text-xs w-field">
                Ligaremos ou enviaremos uma mensagem para confirmar seu número. Podem
                ser aplicadas tarifas padrão de dados e mensagens.{' '}
                <a href="/" className="text-black underline">
                  Política de Privacidade
                </a>
              </p>
              <ButtonPrimary disabled={loading}>
                {!loading ? 'Cadastrar-se' : 'Aguarde...'}
              </ButtonPrimary>
            </form>
            <OauthOptions />
            <p className="text-sm text-center">
              Já possui uma conta?{' '}
              <button
                className="text-rose-500 font-bold"
                onClick={navigateToLoginModal}
              >
                Faça login
              </button>
            </p>
          </section>
        </div>
      </Modal>
    </FormProvider>
  )
}
