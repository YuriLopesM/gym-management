import { Fragment } from 'react'

interface ClassPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ClassPage({ params }: ClassPageProps) {
  const { id } = await params

  return (
    <Fragment>
      <p>ID: {id}</p>
    </Fragment>
  )
}
