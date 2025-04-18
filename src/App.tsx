import './App.css'
import RHForm from './RHForm'
import { zfd } from 'zod-form-data'
import { Controller } from 'react-hook-form'

function App() {
  const schema = zfd.formData({
    text: zfd.text()
  })

  return (
    <div>
      <h2>FUCKING IOS TEXTAREA TEST</h2>
      <RHForm schema={schema} onSubmit={() => { }}>
        <Controller
          name="text"
          render={({ field}) => (
            <>
            <textarea
              {...field}
              style={{ height: '100px', width: '200px' }}
              maxLength={100}
              value={field.value}
              onChange={e => {
                field.onChange(e)
              }}/>
              <p>current typing count : {field.value?.length}</p>
              </>
          )}
        />
      <p>maxLength: 100</p>
      </RHForm>
    </div>
  )
}

export default App
