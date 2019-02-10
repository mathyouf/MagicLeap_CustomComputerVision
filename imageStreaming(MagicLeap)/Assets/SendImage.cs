using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using System.IO;

public class SendImage : MonoBehaviour
{
    public int calls = 0;
    // Use this for initialization
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
        if (calls < 1)
        {
            StartCoroutine(Upload());
            calls += 1;
        }
        else { return; };
    }

    IEnumerator Upload()
    {
        byte[] imageData = File.ReadAllBytes("tushar.jpg");
        UnityWebRequest www = UnityWebRequest.Put("http://500c4ab9.ngrok.io/img", imageData);
        www.SetRequestHeader("Content-Type", "image/jpeg");

        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            // response is inside of the downloadHandler. you could parse json or something else from here.
            Debug.Log("Upload complete! " + www.downloadHandler.text);
        }
    }
}
