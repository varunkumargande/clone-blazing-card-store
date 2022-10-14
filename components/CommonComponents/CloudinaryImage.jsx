//#region Built In Imports
import React, { Fragment } from "react";

//#region Internal Imports
import { Cloudinary } from "cloudinary-core";
import { getCloudinaryImageUrl } from "../../utilities/utils";

export default function CloudinaryImage(props) {
	try {
		//#region Type Declaration / Definition
		let returnElement = <></>;
		let imageTransformation =
			props.transformation !== undefined
				? props.transformation : ''

		//#endregion

		if (!props.imageUrl) {
			return null;
		}

		let cl = new Cloudinary({
			cloud_name: 'dwwbiyabf',
			secure: true,
		});

		cl.responsive();
		returnElement = (
			<Fragment>
				<img
					key={props.keyId}
					data-src={getCloudinaryImageUrl(
						props.imageUrl,
						imageTransformation,
						props.isGif
					)}
					src={getCloudinaryImageUrl(
						props.imageUrl,
						imageTransformation,
						props.isGif
					)}
					alt={props?.alternative}
					className="cld-responsive"
					sizes="100vw"
					onClick={props.onClick}
				/>
			</Fragment>
		);

		return (
			<Fragment>
				{returnElement}
			</Fragment>
		);
	} catch (error) { }
}
