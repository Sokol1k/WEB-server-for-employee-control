import { useCallback } from 'react'
import axios from 'axios'

export const useService = () => {

  const request = useCallback(async (date = {}) => {

    try {

      const response = await axios(date)

      return response

    } catch (err) {

      throw err.response
      
    }
  }, [])

  return {
    request
  }
}