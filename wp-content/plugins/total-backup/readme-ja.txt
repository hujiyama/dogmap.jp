=== Total Backup ===
Contributors: wokamoto, megumithemes
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=9S8AJCY7XB8F4&lc=JP&item_name=WordPress%20Plugins&item_number=wp%2dplugins&currency_code=JPY&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted
Tags: Backup, Ajax
Requires at least: 2.9
Tested up to: 3.3.1
Stable tag: 0.3.5.2

�ғ����� WordPress �T�C�g�� DB �ƃ\�[�X�ꎮ���o�b�N�A�b�v���Ĉ�� zip �t�@�C�����쐬����v���O�C���ł��B

== Description ==

�ғ����� WordPress �T�C�g�� DB �ƃ\�[�X�ꎮ���o�b�N�A�b�v���Ĉ�� zip �t�@�C�����쐬����v���O�C���ł��B

�uSite Backup�v�{�^�����N���b�N����ƃo�b�N�A�b�v���J�n���܂��B
�o�b�N�A�b�v���́A�T�C�g�������e�i���X���[�h�Ɉڍs���܂��B
���Ȃ���΁A���́uBackup Files�v���Ƀ��X�g�A�b�v����܂��B
������Ə������d���̂ŁA�t�@�C���������������肷��ƃ^�C���A�E�g�ŃG���[�ɂȂ��Ă��܂���������܂���B


**PHP5 Required.**

Special thx
 [DigitalCube Co. Ltd.](http://www.digitalcube.jp/ "DigitalCube Co. Ltd.")
 [takenori matsuura](https://twitter.com/tmatsuur "@tmatsuur")

= Localization =
"Total Backup" has been translated into languages. Our thanks and appreciation must go to the following for their contributions:

* Japanese (ja) - [OKAMOTO Wataru](http://dogmap.jp/ "dogmap.jp") (plugin author)

If you have translated into your language, please let me know.

== Installation ==

1. Upload the entire `total-backup` folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.

= Usage =

�uOption�v��ʂł́A���݂͈ȉ��̓�̍��ڂ��ݒ�ł��܂��B

* Archive Path: �o�b�N�A�b�v�t�@�C����ۑ����Ă����f�B���N�g��
* Excluded Dir: �o�b�N�A�b�v�ΏۊO�̃f�B���N�g��

�uArchive Path�v�� web �o�R�ŃA�N�Z�X�ł��Ȃ��f�B���N�g��(�������AWeb �T�[�o���������݌����������Ă���f�B���N�g��)���w�肵�Ă��������B
�f�t�H���g�ł� sys_get_temp_dir() �Ŏ擾�����ꎞ�t�@�C���p�̃f�B���N�g�����Z�b�g����Ă��܂��B

�uExcluded Dir�v�́A�o�b�N�A�b�v�ΏۊO�ɂ������f�B���N�g�����w�肵�Ă��������B
�f�t�H���g�ł́A�ȉ���4�f�B���N�g�����w�肳��Ă��܂��B

* wp-content/cache/ : WP Super Cache �Ƃ����g���L���b�V���t�@�C���u����
* wp-content/tmp/ : DB Cache Reloaded Fix �Ƃ����g���L���b�V���t�@�C���u����
* wp-content/upgrade/ : �R�A��e�[�}�E�v���O�C�����A�b�v�f�[�g����ۂ� WordPress ���g���ꎞ�t�@�C���u����
* wp-content/uploads/ : �摜�t�@�C�������A�b�v���[�h����Ă���f�B���N�g��

�uTotal Backup�v��ʂł́A�uSite Backup�v�{�^�����N���b�N����ƃo�b�N�A�b�v���J�n���܂��B
�o�b�N�A�b�v���́A�T�C�g�������e�i���X���[�h�Ɉڍs���܂��B
���Ȃ���΁A�{�^���̘e�� success.png ���\������A���́uBackup Files�v���Ƀ��X�g�A�b�v����܂��B
��肪�L�����ꍇ�́A�{�^���̘e�� failure.png ���\������܂��B
������Ə������d���̂ŁA�t�@�C���������������肷��ƃ^�C���A�E�g�ŃG���[�ɂȂ��Ă��܂���������܂���B
����Ȏ��� Web �T�[�o�� PHP �̃^�C���A�E�g�ݒ���������Ă݂Ă��������B

�o�b�N�A�b�v�t�@�C���́uBackup Files�v���̃����N����_�E�����[�h�ł��܂��B
�܂��A�Â��o�b�N�A�b�v�t�@�C�������������Ƃ��́A�`�F�b�N�{�b�N�X�Ƀ`�F�b�N�����āuDelete�v�{�^�����N���b�N���Ă��������B

DB �̃o�b�N�A�b�v�t�@�C���́Azip �t�@�C���̒��� {WordPress�C���X�g�[���f�B���N�g����}.yyyymmdd.xxx.sql �Ƃ����t�@�C��(��: wordpress.20111003.330.sql) �Ƃ��Ċ܂܂�܂��B
phpMyAdmin �� mysql �R�}���h���ŕ������Ă��������B

== Frequently Asked Questions ==

none

== Changelog == 

**0.3.1 - Oct. 12, 2011**  
Minor bug fix.

**0.3.0 - Oct. 11, 2011**  
Initial release.
