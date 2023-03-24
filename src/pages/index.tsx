import React from 'react'
import { Dropdown } from '../entry'

const index = () => {
  return (
    <div style={{ height: '100%', overflow: 'hidden auto' }}>
      <div>
        <Dropdown
          line={<>账号信息</>}
          defaultKey='1'
          showLine={true}
          menu={[
            { title: '账号信息', key: '1', suffix: <></> },
            { title: '关联账号', key: '2', suffix: <></> },
            { title: '账号安全', key: '3', suffix: <></> },
            { title: '收起', key: '', suffix: <></> },
          ]}
        />
      </div>
    </div>
  )
}

export default index