import {useState} from 'react'
import {API_URL} from '@/config/index'

import styles from '@/styles/Form.module.css'

export default function ImageUpload({evtId, imageUploaded, token}) {
  const [image, setImage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('files', image) // to send the image to the backend
    formData.append('ref', 'events') // collection that we want to use
    formData.append('refId', evtId) // eventId
    formData.append('field', 'image') // field in backend

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (response?.ok) {
      imageUploaded()
    }
  }

  const handleFileChange = (event) => {
    setImage(event.target.files[0])
  }

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button
          style={{display: 'inline-block', width: '100%', marginTop: '2rem'}}
          className={'btn'}
          type="submit"
        >
          Upload
        </button>
      </form>
    </div>
  )
}
