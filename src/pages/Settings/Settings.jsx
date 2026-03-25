import { useEffect, useState } from 'react'
import './Settings.css'

const defaultSettings = {
  fullName: 'James Arthur',
  email: 'arthur@example.com',
  notifications: true,
  darkMode: false,
}

function Settings() {
  const [formData, setFormData] = useState(() => {
    const savedSettings = localStorage.getItem('dashboardSettings')

    if (savedSettings) {
      return JSON.parse(savedSettings)
    }

    return defaultSettings
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    localStorage.setItem('dashboardSettings', JSON.stringify(formData))

    if (formData.darkMode) {
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [formData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }))

    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('dashboardSettings', JSON.stringify(formData))
    setSaved(true)
  }

  return (
    <section className="settings-page">
      <div className="settings-header">
        <h2>Settings</h2>
        <p>Manage your profile and dashboard preferences.</p>
      </div>

      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="settings-card">
          <h3>Profile Information</h3>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="settings-card">
          <h3>Preferences</h3>

          <label className="toggle-row">
            <div>
              <span className="toggle-title">Email Notifications</span>
              <p className="toggle-text">Receive updates and activity alerts.</p>
            </div>

            <div className="toggle-switch">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </div>
          </label>

          <label className="toggle-row">
            <div>
              <span className="toggle-title">Dark Mode</span>
              <p className="toggle-text">Enable darker interface appearance.</p>
            </div>

            <div className="toggle-switch">
              <input
                type="checkbox"
                name="darkMode"
                checked={formData.darkMode}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </div>
          </label>
        </div>

        <div className="settings-actions">
          <button type="submit" className="save-btn">
            Save Changes
          </button>

          {saved && (
            <span className="save-message">
              Settings saved successfully.
            </span>
          )}
        </div>
      </form>
    </section>
  )
}

export default Settings