import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// GET (read)
export const GET = async (reqest, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.findById(params.id).populate('creator');
    if (!prompts) return new Response('Prompt not found!', { status: 404 });
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (reqest, { params }) => {
  const { prompt, tag } = await reqest.json();
  console.log('prompt', prompt);
  try {
    await connectToDB();

    const existingPrompts = await Prompt.findById(params.id);
    if (!existingPrompts)
      return new Response('Prompt not found!', { status: 404 });

    existingPrompts.prompt = prompt;
    existingPrompts.tag = tag;

    await existingPrompts.save();

    return new Response(JSON.stringify(existingPrompts), { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};

// DELETE (delete)

export const DELETE = async (reqest, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.findByIdAndRemove(params.id);
    return new Response('Prompt Deleted Successfully', { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};
