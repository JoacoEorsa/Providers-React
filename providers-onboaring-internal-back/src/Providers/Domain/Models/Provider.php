<?php

declare(strict_types=1);

namespace Lightit\Providers\Domain\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Lightit\Clinics\Domain\Models\Clinic;
use Lightit\Providers\Domain\Enums\GenderEnum;
use Lightit\Users\Domain\Models\User;

/**
 * @property int                          $id
 * @property string                       $name
 * @property string                       $email
 * @property string                       $phone
 * @property string                       $gender
 * @property string|null                  $about
 * @property array<int, string>|null      $languages
 * @property string|null                  $profile_pic
 * @property int                          $specialty_id
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Clinic> $clinics
 * @property-read int|null $clinics_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, User> $favoritedBy
 * @property-read int|null $favorited_by_count
 * @property-read Specialty $specialty
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereAbout($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereLanguages($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereProfilePic($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereSpecialtyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Provider whereUpdatedAt($value)
 * @method static Builder<static>|Provider                               favoritedBy(int $userId)
 * @method static Builder<static>|Provider                               clinicId(?int $clinicId = null)
 * @mixin \Eloquent
 */
class Provider extends Model
{
    protected $guarded = ['id'];

    /** @var array<string, string> */
    protected $casts = [
        'languages' => 'array',
        'gender' => GenderEnum::class,
    ];

    /**
     * @return BelongsTo<Specialty, $this>
     */
    public function specialty(): BelongsTo
    {
        return $this->belongsTo(Specialty::class);
    }

    /**
     * @return BelongsToMany<Clinic, $this>
     */
    public function clinics(): BelongsToMany
    {
        return $this->belongsToMany(Clinic::class)
            ->withTimestamps();
    }

    /**
     * @return BelongsToMany<User, $this>
     */
    public function favoritedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'favorites')
            ->withTimestamps();
    }

    /**
     * @param Builder<self> $query
     *
     * @return Builder<self>
     */
    public function scopeClinicId(Builder $query, int|null $clinicId = null): Builder
    {
        if ($clinicId) {
            $query->whereHas('clinics', fn (Builder $q) => $q->whereKey($clinicId));
        }

        return $query;
    }

    public function isFavoritedBy(User $user): bool
    {
        return $user->favoriteProviders()->whereKey($this->getKey())->exists();
    }
}
