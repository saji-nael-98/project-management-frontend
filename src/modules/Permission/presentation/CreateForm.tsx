import { Autocomplete, Checkbox, Stack } from '@mantine/core'
import React, { useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormController } from 'shared'
import { Modal } from 'shared/Modal'
import { useSave } from 'utils/mutation/infrastructure'
import { useGetList } from 'utils/query/infrastructure'

export const CreatePermissionForm: React.FC = () => {
  const form = useForm({


  })
  const { mutate, isSuccess } = useSave({
    type: 'sub-resource',
    mutationType: 'create',
    resource: 'ROLES',
    subResource: 'PERMISSIONS',
    resourceId: form.getValues('role')
  })
  const [role, resource] = form.watch(['role', 'resource'])

  const { data: roles } = useGetList({
    type: 'resource',
    resource: 'ROLES',
  })

  const { data: unauthoraizedTables } = useGetList({
    type: 'sub-resource',
    resource: 'ROLES',
    subResource: 'PERMISSIONS',
    resourceId: form.watch('role'),
    method: 'unauthorized-tables',
    options: {
      enabled: !!role
    }
  })

  const valuesHandler = (data: any) => {
    mutate(data)
  }

  const rolesList = useMemo(() => (roles as [])?.map((role: { name: string }) => role.name) ?? [], [roles])

  useEffect(() => {
    if (!role) {
      form.resetField('resource')
    }
  }, [role])

  useEffect(() => {
    if (!resource) {
      form.resetField('write')
      form.resetField('read')
      form.resetField('delete')
    }
  }, [resource])

  return (
    <FormProvider {...form}>
      <Modal title={'Permision'} handleValues={valuesHandler} isSuccess={isSuccess}>
        <FormController name='role' render={({ field }) => <Autocomplete
          label="Role"
          placeholder="Pick one"
          data={rolesList ?? []}
          withinPortal
          dropdownPosition='bottom'
          {...field}
        />} />
        {!!role && <>
          <FormController name='resource' render={({ field }) => <Autocomplete
            label="Resource"
            placeholder="Pick one"
            data={unauthoraizedTables as [] ?? []}
            withinPortal
            {...field}
          />} />
          {!!resource && <Stack py={'xs'}>
            <FormController name='read' render={({ field: { value, ...field } }) => <Checkbox
              label="Read"
              size="xs"
              checked={value}
              {...field}
            />} />
            <FormController name='write' render={({ field: { value, ...field } }) => <Checkbox
              label="Write"
              size="xs"
              checked={value}
              {...field}
            />} />
            <FormController name='delete' render={({ field: { value, ...field } }) => <Checkbox
              label="Delete"
              size="xs"
              checked={value}
              {...field}
            />} />
          </Stack>}
        </>}
      </Modal>
    </FormProvider>
  )
}

