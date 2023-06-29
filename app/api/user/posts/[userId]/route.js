import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
export const GET = async (reqest, { params }) => {
  try {
    await connectToDB();

    const userPrompts = await Prompt.find({ creator: params.userId }).populate(
      'creator'
    );
    return new Response(JSON.stringify(userPrompts), { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};
