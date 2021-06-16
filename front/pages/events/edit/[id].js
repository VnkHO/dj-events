import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import {API_URL} from '@/config/index'

import {format} from 'date-fns'
import {FaImage} from 'react-icons/fa'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

import styles from '@/styles/Form.module.css'

export default function EditEventPage({evt}) {
  const [values, setValues] = useState({
    name: evt?.name,
    performers: evt?.performers,
    venue: evt?.venue,
    address: evt?.address,
    date: evt?.date,
    time: evt?.time,
    description: evt?.description,
  })

  const [imagePreview, setImagePreview] = useState(
    evt?.image ? evt?.image?.format?.thumbnail?.url : null,
  )

  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('VALUES', values)

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === '',
    )

    if (hasEmptyFields) {
      toast.error('Please fill in all fields')
    }

    const response = await fetch(`${API_URL}/events/${evt?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (!response?.ok) {
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

  const imageUploaded = async (event) => {
    const response = await fetch(`${API_URL}/events/${evt?.id}`)
    const data = await response?.json()

    setImagePreview(data?.image?.formats?.thumbnail?.url)
    setShowModal(false)
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
              value={format(new Date(values?.date), 'yyyy-MM-dd')}
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

      <h2>Event Image</h2>
      {imagePreview ? (
        <div>
          <Image src={imagePreview} width={170} height={100} />
        </div>
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt?.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  )
}

export async function getServerSideProps({params: {id}}) {
  const response = await fetch(`${API_URL}/events/${id}`)
  const evt = await response.json()

  return {
    props: {
      evt,
    },
  }
}
