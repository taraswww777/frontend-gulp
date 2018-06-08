<?php
/**
 * Created by PhpStorm.
 * User: taras
 * Date: 08.06.2018
 * Time: 23:56
 */

class FrontendGulp
{
	private $manifest = [];
	private $baseUrl = '/dist';
	private static $_instance;

	private function __construct()
	{
	}

	protected function __clone()
	{
	}

	public static function getInstance()
	{
		if (null === self::$_instance) self::$_instance = new self();
		return self::$_instance;
	}


	private function loadManifest($typeManifest = 'css')
	{
		if (empty($this->manifest[$typeManifest])) {

			$path = $_SERVER['DOCUMENT_ROOT'] . '/dist/manifest/' . $typeManifest . '.json';
			if (file_exists($path)) {
				$this->manifest[$typeManifest] = json_decode(file_get_contents($path), true);
			}
		}
	}

	public function urlCss($point)
	{
		$typeManifest = 'css';
		$this->loadManifest();
		if (!empty($this->manifest[$typeManifest][$point . '.css'])) {
			$file = $this->manifest[$typeManifest][$point . '.css'];
		} else {
			$file = $point . '.css';
		}
		return $this->baseUrl . '/' . $typeManifest . '/' . $file;
	}
}
