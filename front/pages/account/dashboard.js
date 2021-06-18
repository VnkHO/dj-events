import {useRouter} from 'next/router'

import {parseCookies} from '@/helpers/index'

import {API_URL} from '@/config/index'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'

import styles from '@/styles/Dashboard.module.css'

export default function DashboardPage({events, token}) {
  const router = useRouter()

  const deleteEvent = async (id) => {
    if (confirm('Are you sure?')) {
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response?.json()
      if (!response?.ok) {
        toast?.error(data?.message)
      } else {
        router?.reload()
      }
    }
  }

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events?.map((evt) => (
          <DashboardEvent key={evt?.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({req}) {
  const {token} = parseCookies(req)

  const response = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const events = await response?.json()

  return {
    props: {events, token},
  }
}
