@block('%block-name%','%prefix%')
@if($why)
	@foreach($why as $whyItem)
	<section class="@blockName()">
		<h2 class="@blockElem('title')">{{$whyItem['archive-product:why:title']}}</h2>
		@if($whyItem['archive-product:why:answers'])
			<div class="@blockElem('answers')">
				@foreach($whyItem['archive-product:why:answers'] as $answersItem)
					<div class="@blockElem('answers-item')">
						@if($answersItem['archive-product:why:answers-icon'])
						<span class="@blockElem('answers-item-icon',$answersItem['archive-product:why:answers-icon'])"></span>
						@endif
						<p class="@blockElem('answers-item-text')">{{$answersItem['archive-product:why:answers-text']}}</p>
					</div>
				@endforeach
			</div>
		@endif
	</section>
	@endforeach
@endif
