const randomBgGenerator = () => {
  const bgColors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
  ];

  return bgColors[Math.floor(Math.random() * bgColors.length)]
}

export default randomBgGenerator;