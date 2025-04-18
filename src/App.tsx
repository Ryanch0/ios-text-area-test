import './App.css'
import RHForm from './RHForm'
import { zfd } from 'zod-form-data'
import { Controller } from 'react-hook-form'

function App() {
  const schema = zfd.formData({
    text: zfd.text()
  })

  const typingChange = (e: React.ChangeEvent<HTMLTextAreaElement>, max: number) => {
    if(e.target.value.length > max){
      e.target.value = e.target.value.slice(0, max)
    }
  }

  function getTextLength(text: string) {
    // 모든 줄바꿈을 \n으로 통일
    if(text){
      const normalized = text.replace(/\r\n|\r/g, '\n');
      return normalized.length;
    }
  }
  

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
                typingChange(e, 100)
              }}/>
              <p>current typing count : {getTextLength(field.value)}</p>
              </>
          )}
        />
      <p>maxLength: 100</p>
      </RHForm>
    </div>
  )
}

export default App
