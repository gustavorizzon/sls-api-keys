const privateUsers = async () => {
  // poderia obter os usuarios via banco de dados

  return [
    'gustavo@example.com',
    'other@example.com',
    'test'
  ]
}

exports.private = privateUsers
