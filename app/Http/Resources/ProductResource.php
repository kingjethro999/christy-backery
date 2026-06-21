<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'category_name' => $this->relationLoaded('category') ? $this->category->name : null,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => (float) $this->price,
            'image_path' => $this->image_path,
            'is_available' => (bool) $this->is_available,
            'stock' => (int) $this->stock,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
