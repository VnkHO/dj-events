import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

import {parseCookies} from '@/helpers/index'

import {API_URL} from '@/config/index'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from '@/components/Layout'

import styles from '@/styles/Form.module.css'

export default function AddEventsPages({token}) {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  })

  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === '',
    )

    if (hasEmptyFields) {
      toast.error('Please fill in all fields')
    }

    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    if (!response?.ok) {
      if (response?.status === 403 || response?.status === 401) {
        toast?.error(`No Token included`)
        return
      }
      toast?.error('Something Went Wrong!')
    } else {
      const evt = await response.json()
      router.push(`/events/${evt?.slug}`)
    }
  }

  const handleInputChange = (event) => {
    const {name, value} = event?.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  return (
    <Layout title="Add New Event">
      <Link href="/events">
        <a>{'<'} Go Back</a>
      </Link>
      <h1>Add Event</h1>

      <ToastContainer />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor={'name'}>Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values?.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>

        <button style={{width: '100%'}} className={'btn'} type="submit">
          Add Event
        </button>
      </form>
    </Layout>
  )
}

export async function getServerSideProps({req}) {
  const {token} = parseCookies(req)

  return {
    props: {
      token,
    },
  }
}
