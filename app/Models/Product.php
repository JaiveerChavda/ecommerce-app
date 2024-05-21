<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Product extends Model
{
    use HasFactory;
    use HasSlug;
    use SoftDeletes;

    protected $fillable = ['title','slug','image','image_mime','image_size','description','price'];

    public static function booted()
    {
        static::creating(function (Product $product) {
            $product->created_by = auth()->id();
            $product->updated_by = auth()->id();
        });

        static::updating(function (Product $product) {
            $product->updated_by = auth()->id();
        });

        static::deleting(function (Product $product) {
            $product->deleted_by = auth()->id();
        });
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
        ->generateSlugsFrom('title')
        ->saveSlugsTo('slug');
    }
}
