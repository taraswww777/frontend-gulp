@block('last-news')

<?php
/**
 * @var array $posts
 * @var WP_Post $postItem
 */
?>

@if($newsList)
	<div class="@blockName()">
		@foreach($newsList as $newsItem)
			<div class="@blockElem('item')">
			<a class="@blockElem('item-link')" href="{{$newsItem['LINK']}}">
				@if($newsItem['IMAGE_URL'])
					<div class="@blockElem('item-wrapper-img')">
						<img class="@blockElem(item-img)" src="{{$postItem['IMAGE_URL']}}">
					</div>
				@endif
				<div class="@blockElem('item-wrapper-info')">
					<div class="@blockElem('item-title')">{{$newsItem['NAME']}}</div>
				</div>
			</a>
			</div>
		@endforeach
	</div>
@endif
