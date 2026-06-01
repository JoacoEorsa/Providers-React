<?php

declare(strict_types=1);

namespace Lightit\Providers\Domain\Actions;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
// use Illuminate\Database\Eloquent\Builder;
use Lightit\Providers\Domain\Models\Provider;
// use Lightit\Users\Domain\Models\User;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ListProvidersAction
{
    /**
     * NOTE: User $user param and the favorited filter / withExists block were
     * temporarily removed for the front-end onboarding challenge. Restore when
     * authentication is implemented.
     *
     * @return LengthAwarePaginator<int, Provider>
     */
    public function execute(): LengthAwarePaginator
    {
        return QueryBuilder::for(Provider::class)
            ->allowedFilters([
                AllowedFilter::belongsTo('specialty_id', 'specialty'),
                AllowedFilter::scope('clinic_id'),
                AllowedFilter::exact('gender'),
                AllowedFilter::partial('name'),
                // AllowedFilter::callback('favorited', function (Builder $query, bool $value) use ($user): void {
                //     if ($value) {
                //         $query->whereHas('favoritedBy', fn (Builder $q) => $q->where('user_id', $user->id));
                //     } else {
                //         $query->whereDoesntHave('favoritedBy', fn (Builder $q) => $q->where('user_id', $user->id));
                //     }
                // }),
            ])
            ->with(['specialty', 'clinics'])
            // ->withExists([
            //     'favoritedBy as is_favorited' => fn (Builder $q) => $q->where('user_id', $user->id),
            // ])
            ->paginate();
    }
}
