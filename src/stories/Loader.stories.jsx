import React from 'react'
import { Loader, Stack, Text, Button } from '../components'
import { styled } from 'styled-components'

export default {
  title: 'Component | Loader',
  component: Loader
}

const Title = styled(Text)`
  font-size: 1.2rem;
  font-family: sans-serif;
`

const StoryContainer = styled.a`
  border: solid 1px #30303030;
  border-radius: 5px;
  padding: 8px 12px;
  width: 100%;
  text-decoration: none;
  cursor: pointer;
  
  &:link, &:visited {
    text-decoration: none;
    color: inherit;
  }

  &:hover {
    background-color: #fafafa;
  }
`

const Story = props => {
  const { title, url } = props

  return (
    <StoryContainer href={url} target='_blank'>
      <Title>{title}</Title>
    </StoryContainer>
  )
}

const StoriesView = props => {
  const { data, reload, load, reloading } = props
  return (
    <Stack spacing={12}>
      {data.map((story) => <Story title={story.title} url={story.url} key={story.id} />)}
      {reloading ? <div>Loading ... </div> : null}
      <Stack horizontal spacing={24}>
        <Button label='Refresh' ariaLabel='refresh new stories' onClick={() => reload()} />
        <Button label='Reload' ariaLabel='reload page' onClick={() => load()} />
      </Stack>
    </Stack>
  )
}

const getStory = async (id) => {
  const result = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  return result.json()
}

const getStories = async (count = 8) => {
  const results = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  const json = await results.json()
  const topStoryIds = json.slice(0, count)

  const storyResults = await Promise.all(topStoryIds.map(getStory))
  return storyResults
}

export const LoaderExamples = props => {
  return (
    <Loader
      fetch={getStories}
      View={StoriesView}
    />
  )
}
