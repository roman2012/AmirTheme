<div class="fleft">
	<div class="eleven columns">
		<div class="post-border-right">
			<?php
				foreach ($nodes as $node):
					$this->Nodes->set($node);
				?>
				<article class="post-holder">
					<?php 
						echo $this->Nodes->info(); 
						echo $this->Nodes->body();
						echo $this->Nodes->moreInfo();
					?>
				</article>				
			<?php
				endforeach;
			?>
			<div class="nodes promoted">
				<?php
					if (count($nodes) == 0) {
						echo __d('croogo', 'No items found.');
					}
				?>
				<div class="paging"><?php echo $this->Paginator->numbers(); ?></div>
			</div>
					
		</div>			
	</div>
</div>






