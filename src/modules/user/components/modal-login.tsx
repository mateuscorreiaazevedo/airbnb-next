'use client'

// Components
import { Button, InputField, ListItem, Modal } from '@/main/ui'
// Icons
import { X } from 'lucide-react'
// Utils
import { FormProvider, useForm } from 'react-hook-form'
// React
import React from 'react'

export const ModalLogin = () => {
  const [open, setOpen] = React.useState(false)
  const methods = useForm()

  const closeModal = () => {
    methods.reset()
    setOpen(false)
  }

  return (
    <FormProvider {...methods}>
      <Modal button={<ListItem>Entrar</ListItem>} isOpen={open} toggleOpenChange={setOpen}>
        <div className="absolute w-modal min-h-modal shadow-md border border-zinc-300 top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 bg-white rounded-lg">
          <section className="flex w-full items-center px-4 pb-4 h-16 border-b border-zinc-300">
            <button
              onClick={closeModal}
              className="p-2 rounded-full hover:bg-neutral-100 active:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="flex-1 text-center font-bold text-lg">Entrar</h2>
          </section>
          <section className="px-4 mt-2 space-y-4">
            <h1 className="text-2xl font-semibold">Bem-vindo de volta</h1>
            <form className="w-full flex flex-col items-center justify-center gap-4">
              <fieldset>
                <InputField label="Email" field="email" roundedTop />
                <InputField label="Senha" field="password" roundedBotton hasPassword />
              </fieldset>
              <p className="text-zinc-400 text-xs w-field">
                Ligaremos ou enviaremos uma mensagem para confirmar seu número. Podem ser
                aplicadas tarifas padrão de dados e mensagens.{' '}
                <a href="/" className="text-black underline">
                  Política de Privacidade
                </a>
              </p>
              <Button type="submit">Continuar</Button>
            </form>
          </section>
        </div>
      </Modal>
    </FormProvider>
  )
}