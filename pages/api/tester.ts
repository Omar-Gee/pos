import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '../../interfaces'



export default function handler(
	_req: NextApiRequest,
	res: NextApiResponse<User[]>
) {
	// Get data from your database
	res.status(200).json(_req.body)
}
