<?php	get_header();
	$archive_title = get_vicuna_archive_title();
?>
	<title><?php vicuna_title($archive_title); ?></title>
</head>
<body class="dateBasedArchive <?php vicuna_layout('archive'); ?>">
<?php vicuna_analysis_code() ?>
<div id="header">
	<p class="siteName"><a href="<?php bloginfo('home'); ?>" title="<?php printf(__('Return to %s index', 'vicuna'), get_bloginfo('name')); ?>"><?php bloginfo('name'); ?></a></p>
	<?php vicuna_description(); ?>
<?php vicuna_global_navigation() ?>
</div>
<div id="content">
	<div id="main">
		<p class="topicPath"><a href="<?php bloginfo('home'); ?>"><?php _e('Home', 'vicuna'); ?></a> &gt; <?php _e('Archives'); ?> &gt; <span class="current"><?php echo $archive_title; ?></span></p>
<!--start dynamic_sidebar header -->
<div id="header_bar" align="center"><?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('header') ) : ?><?php endif; ?></div>
<!--end dynamic_sidebar header -->
		<h1><?php echo $archive_title; ?></h1>
<?php
	if (have_posts()) :
		while (have_posts()) : the_post();
?>

		<div class="section entry" id="entry<?php the_ID(); ?>">
			<h2><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h2>
			<ul class="info">
				<li class="date"><?php the_time(__('Y-m-d (D)', 'vicuna')) ?></li>
				<li class="category"><?php the_category(' | ') ?></li>
				<?php /* -- ex cng s -- */
					vicuna_author_displays();
					vicuna_tag_displays(); ?>
				<?php //if (function_exists('the_tags')) : the_tags('<li class="tags">', ' | ', '</li>'); endif; ?>
				<?php /* -- ex cng e -- */ ?>
				<?php edit_post_link(__('Edit'), '<li class="admin">', '</li>'); ?>
			</ul>
			<div class="textBody">
<?php the_content(__('Continue reading', 'vicuna')); ?>
			</div>
			<ul class="reaction">
<?php
			$trackpingCount = get_vicuna_pings_count();
/* -- whisper cng s --
			$commentCount = (int) get_comments_number() - (int) $trackpingCount;
-- */
			$commentCount = (int) get_vicuna_comment_count() - (int) $trackpingCount;
/* -- whisper cng e -- */
			if ($commentCount > 0 || 'open' == $post->comment_status) : ?>
				<li class="comment"><a href="<?php the_permalink() ?>#comments" title="<?php printf(__('Comments on %s'), $title); ?>" rel="nofollow"><?php if ('open' == $post->comment_status) : _e('Comments'); else : _e('Comments (Close)', 'vicuna'); endif; ?></a>: <span class="count"><?php echo $commentCount; ?></span></li>
<?php			else : ?>
				<li><?php _e('Comments (Close)', 'vicuna'); ?>: <span class="count"><?php echo $commentCount; ?></span></li>
<?php
			endif;
			if ($trackpingCount > 0 || 'open' == $post->ping_status) :
?>
				<li class="trackback"><a href="<?php the_permalink() ?>#trackback" title="<?php printf(__('Trackbacks to %s', 'vicuna'), $title); ?>" rel="nofollow"><?php if ('open' == $post->ping_status) : _e('Trackbacks', 'vicuna'); else : _e('Trackbacks (Close)', 'vicuna'); endif; ?></a>: <span class="count"><?php echo $trackpingCount; ?></span></li>
<?php			else : ?>
				<li><?php _e('Trackbacks (Close)', 'vicuna'); ?>: <span class="count"><?php echo $trackpingCount; ?></span></li>
<?php			endif ?>
			</ul>
		</div>
<?php
		endwhile;
	endif;
?>
<!--start dynamic_sidebar footer -->
<div id="footer_bar" align="center"><?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('footer') ) : ?><?php endif; ?></div>
<!--end dynamic_sidebar footer -->
<!--start pagenavi -->
<?php if(function_exists('wp_pagenavi')) { wp_pagenavi(); } else { vicuna_paging_link('indent=2'); } ?>
<!--end pagenavi -->
		<p class="topicPath"><a href="<?php bloginfo('home'); ?>"><?php _e('Home', 'vicuna'); ?></a> &gt; <?php _e('Archives'); ?> &gt; <span class="current"><?php echo $archive_title; ?></span></p>

	</div><!-- end main-->

<?php	get_sidebar(); ?>

<?php	get_footer(); ?>
