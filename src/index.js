import React from 'react'
import ReactDom from 'react-dom'

import {Button} from "antd-mobile";

ReactDom.render(
    (<Button type = "primary">hello react</Button>),
    document.getElementById('root')
)
