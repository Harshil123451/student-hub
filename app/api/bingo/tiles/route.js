import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { content, authorName } = await request.json();

    // Validate input
    if (!content || content.length > 100) {
      return NextResponse.json(
        { error: 'Content is required and must be less than 100 characters' },
        { status: 400 }
      );
    }

    if (authorName && authorName.length > 50) {
      return NextResponse.json(
        { error: 'Author name must be less than 50 characters' },
        { status: 400 }
      );
    }

    // Create new tile using Supabase
    const { data: tile, error } = await supabase
      .from('bingo_tiles')
      .insert([
        {
          content,
          author_name: authorName,
          status: 'pending',
          upvotes: 0,
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(tile, { status: 201 });
  } catch (error) {
    console.error('Error creating bingo tile:', error);
    return NextResponse.json(
      { error: 'Failed to create bingo tile' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data: tiles, error } = await supabase
      .from('bingo_tiles')
      .select('*')
      .eq('status', 'approved')
      .order('upvotes', { ascending: false });

    if (error) throw error;

    return NextResponse.json(tiles);
  } catch (error) {
    console.error('Error fetching bingo tiles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bingo tiles' },
      { status: 500 }
    );
  }
} 