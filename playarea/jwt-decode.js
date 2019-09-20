const jwt = require('jsonwebtoken')

const token  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDgyNjA2NjBlMjNlODRlN2RjNmVmOTgiLCJ1c2VybmFtZSI6InVzZXIxNCIsIkNyZWF0ZWRBdCI6MTU2OTAwMTY5OTQwMywiaWF0IjoxNTY5MDAxNjk5fQ.9GDXYRZIx--E34VxTWghZx3L7A1YXDYZZl97KZsxbmg'

console.log(jwt.verify(token,'jwt@123'))
