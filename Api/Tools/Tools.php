<?php
/**
 * Author: Kovalev Taras
 * Author Email: taraswww777@mail.ru
 * Date: 26.07.2018 23:44
 */

namespace FrontendGulp\Api\Tools;

abstract class Tools
{

	public static function clearParamString($str)
	{
		return trim(trim(trim($str, '"'), '\''));
	}

	public static function mkDir($dir)
	{
		if (!@mkdir($dir, 0755, true) && !is_dir($dir)) {
			throw new \RuntimeException(sprintf('Directory "%s" was not created', $dir));
		}
	}

	public static function removeDir($path)
	{
		$files = array_diff(scandir($path, SCANDIR_SORT_NONE), array('.', '..'));
		foreach ($files as $file) {
			$fileName = $path . '/' . $file;
			(is_dir($fileName)) ? self::removeDir($fileName) : unlink($fileName);
		}
	}
}
